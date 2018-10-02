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


export const QUERY_LISTS = gql`
query GetConfigs {
  tamanhos {
    id
    nome
    valor
    minutos
  }
  sabores {
    id
    nome
    valor
    minutos
  }
  extras {
    id
    nome 
    valor
    minutos
  }
}
`

const ADD_PIZZA = gql`
mutation AddPizza($tamanhoId: Int!, $saborId: Int!, $extraId: [Int], $valor: Int!, $tempo: Int!){
    pedidoPizza(tamanhoId: $tamanhoId, saborId: $saborId, extraId: $extraId, valor: $valor, tempo: $tempo){
     id       
    }
  }
`;



class Pedir extends React.Component {
  state = {
    activeStep: 0,
    tamanho: {id: ''},
    sabor: {id: ''},
    extra: [],
    valor: 0,
    tempo: 0
  }

  getSteps = () => {
    return ['Escolha o tamanho', 'Escolha o sabor', 'Mais algum extra?'];
  }
  removeitem = function (col, key, value) {
    if (value === undefined)
        return;
  
    for (var i in col) {
        if (col[i][key] === value) {
            col.splice(i, 1);
        }
    }
  }

  handleChange = (event, o) => {
    this.setState({ [event.target.name]: o });
  };

  handleChangeCheck = (event, o) => {
    let ex = this.state.extra
    if(event.target.checked){
      ex.push(o)
    }
    else{
      this.removeitem(ex, 'id',o.id)
    }
    this.setState({ extra: ex })
  }

  handleNext = (e, active, len ) => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }))
    if(active === len - 1){
      this.getTotal()
    }
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
      valor: 0
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

  getTotal = () => {
    if (this.state.valor === 0){
      let valor = 0
      let tempo = 0

      valor += this.state.tamanho.valor
      tempo += this.state.tamanho.minutos

      valor += this.state.sabor.valor
      tempo += this.state.sabor.minutos

      for (var i in this.state.extra) {
        valor += this.state.extra[i].valor
        tempo += this.state.extra[i].minutos
      }
      this.setState({ valor: valor })
      this.setState({ tempo: tempo })
    }
    return true
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
               {dados.tamanhos.map((o, i) => ( <FormControlLabel key={i} value={o.id} control={<Radio />} label={o.nome} onChange={(e) => this.handleChange(e, o)} />)) }
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
             {dados.sabores.map((o, i) => ( <FormControlLabel key={i} value={o.id} control={<Radio />} label={o.nome} onChange={(e) => this.handleChange(e,o)} />)) }
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
              <FormControlLabel key={i}
                control={
                  <Switch key={i}
                    name={'check'+ o.id}
                    checked={this.state.extra && this.state.extra.find((i)=> {return i.id === o.id}) !== undefined }
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
    const steps = this.getSteps();
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
                        onClick={(e) => this.handleNext(e,activeStep, steps.length)}
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
                <Typography className={classes.title} variant="display1" component="h1">
                  Pedido
                </Typography>
                <br />
                <Typography variant="title" component="h2">
                  Tamanho 
                </Typography>
                <Typography variant="subheading" align="right">
                  {this.state.tamanho.nome} - {this.state.tamanho.valor} reais
                </Typography>
                <br />
                <Typography variant="title" component="h2">
                  Sabor
                </Typography>                
                <Typography variant="subheading" align="right">
                  {this.state.sabor.nome }                 
                </Typography>
                <br />
                <Typography variant="title" component="h2">
                  Extra:
                </Typography>
                <Typography variant="subheading" align="right">
                  {this.state.extra.map((o, i) => (<Typography key={i} align="right" component="p"> {o.nome} - {o.valor} reais </Typography> ))}
                </Typography>
                <Typography variant="title" component="h2">
                  Tempo:
                </Typography>
                <Typography variant="subheading" align="right">
                  {this.state.tempo} minutos
                </Typography>
                <Typography variant="title" component="h2">
                  Valor Total:
                </Typography>
                <Typography variant="subheading" align="right">
                  {this.state.valor} reais
                </Typography>
                
              </CardContent>
              <CardActions>
                <Mutation mutation={ADD_PIZZA}>
                  {(pedidoPizza, { data }) => (
                    <div>
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          pedidoPizza({ variables: { 
                            tamanhoId: parseInt(this.state.tamanho.id, 10),
                            saborId: parseInt(this.state.sabor.id, 10),
                            extraId: this.state.extra.reduce((p,d)=>{
                                p.push(parseInt(d.id, 10))
                                return p
                            },[]),
                            tempo: parseInt(this.state.tempo, 10), 
                            valor: parseInt(this.state.valor, 10) 
                          }})      
                          this.handleReset()
                        }}
                      >
                        
                        <Button type="submit" size="small">Confirmar Pedido</Button>
                      </form>
                    </div>
                  )}
                </Mutation>
              </CardActions>
            </Card>
            <Button onClick={this.handleReset} className={classes.button}>
              Refazer pedido
            </Button>
          </Paper>
        )}
      </div>
    )
  }
}

Pedir.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Pedir);
