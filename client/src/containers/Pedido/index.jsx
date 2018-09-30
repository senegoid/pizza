import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Query, Mutation } from 'react-apollo'

import gql from 'graphql-tag'

import styles from './styles'


const QUERY_LISTS = gql`
query ListarUsuarios {
  tamanhos {
    id
    nome
    valor
    minutos
  }
  sabores {
    id
    nome
  }
  extras {
    id
    nome 
  }
}
`

Object.prototype.removeItem = function (key, value) {
  if (value == undefined)
      return;

  for (var i in this) {
      if (this[i][key] == value) {
          this.splice(i, 1);
      }
  }
};
function getSteps() {
  return ['Escolha o tamanho', 'Escolha o sabor', 'Mais algum extra?'];
}
class Pedir extends React.Component {
  state = {
    activeStep: 0,
    tamanho: {id: ''},
    sabor: {id: ''},
    extra: [],
    valor: 0,
    tempo: 0
  };

  handleChange = (event, o) => {
    this.setState({ [event.target.name]: o });
  };
  handleChangeCheck = (event, o) => {
    let ex = this.state.extra
    if(event.target.checked){
      ex.push(o)
    }
    else{
      ex.removeItem('id',o.id)
    }
    //ex[[event.target.name]] =  event.target.checked? o: null
    this.setState({ extra: ex })
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }))
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }))
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
      tamanho: {id: ''},
      sabor: {id: ''},
      extra: [],
      valor: 0,
      tempo: 0
    })
  }

  getDisabled = (step) => {
    switch (step) {
      case 0:
        return !this.state.tamanho.id > 0
      case 1:
        return !this.state.sabor.id > 0
      default:
        return false;

  }
}
  getStepContent = (step, dados) => {
    const { classes } = this.props;
    switch (step) {
      case 0:
        return (
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Tamanhos</FormLabel>
              <RadioGroup
                aria-label="Tamanho"
                name="tamanho"
                className={classes.group}
                value={this.state.tamanho.id} 
              >
               {dados.tamanhos.map((o, i) => ( <FormControlLabel value={o.id} control={<Radio />} label={o.nome} onChange={(e) => this.handleChange(e, o)} />)) }
              </RadioGroup>
            </FormControl>
            )
      case 1:
        return (
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Sabores</FormLabel>
            <RadioGroup
              aria-label="Sabor"
              name="sabor"
              className={classes.group}
              value={this.state.sabor.id}
            >
             {dados.sabores.map((o, i) => ( <FormControlLabel value={o.id} control={<Radio />} label={o.nome} onChange={(e) => this.handleChange(e,o)} />)) }
            </RadioGroup>
          </FormControl>
          )
      case 2:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">Extras</FormLabel>
            <FormGroup>
            {dados.extras.map((o, i) => 
              (
              <FormControlLabel
                control={
                  <Switch
                    name={'check'+ o.id}
                    checked={this.state.extra && this.state.extra.find((i)=> {return i.id === o.id}) != undefined }
                    //onChange={(e) => this.handleChange(o, e)}
                    onChange={(e) => this.handleChangeCheck(e, o)}
                    value={o.id}
                  />
                }
                label={o.nome}
              />
            ))}
           </FormGroup>
        
      </FormControl>
      )

      default:
        return 'Unknown step';
    }
  }

  render() {
    const {classes} = this.props
    const steps = getSteps();
    const { activeStep } = this.state;
  
    return (      
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                <Query query={QUERY_LISTS}>
                {({ loading, error, data }) => {
                  //console.error(error)
                  //console.log(loading)
                  //console.log(data)
                  if(!error && !loading ){
                    this.dados =  data
                    return (
                      this.getStepContent(index, data)
                    )
                  }
                  else
                    return null
                  }}
                  </Query>                  
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Voltar
                      </Button>
                      <Button
                        disabled={this.getDisabled(index)}
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Acabei' : 'Ok'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Pedido concluído</Typography>  
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary">
                  Pedido
                </Typography>
                <Typography variant="headline" component="h2">
                  Sabor
                  {this.state.sabor.nome }                 
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Tamanho 
                  {this.state.tamanho.nome}
                  Extra:
                </Typography>
                {this.state.extra.map((o, i) => (<Typography component="p"> {o.nome} </Typography> ))}
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            <Button onClick={this.handleReset} className={classes.button}>
              Novo pedido
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

Pedir.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Pedir);
