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
import { Query, Mutation } from 'react-apollo'

import gql from 'graphql-tag'



const QUERY_LISTS = gql`
query ListarUsuarios {
  tamanhos {
    id
    nome
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

const MUTATION_PEDIDO = gql`
mutation pedidoPizza(tamanho: Int, sabor: Int, extra: [Int], valor: Int, tempo: Int) {
  pedidoPizza(tamanhoId: tamanho, saborId: sabor, extraId: extra, valor: valor, tempo: tempo){
    id
  }
}
`
const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  }
});

function getSteps() {
  return ['Escolha o tamanho', 'Escolha o sabor', 'Mais algum extra?'];
}



class Pedir extends React.Component {
  
  state = {
    activeStep: 0,
    tamanho: undefined,
    sabor: undefined,
    extra: [],
    valor: 0,
    tempo: 0
  };
  
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

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
                value={this.state.tamanho}
                onChange={this.handleChange}
              >
               {dados.tamanhos.map((o, i) => ( <FormControlLabel value={o.id} control={<Radio />} label={o.nome} />)) }
              </RadioGroup>
            </FormControl>
            );
      case 1:
        return (
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Sabores</FormLabel>
            <RadioGroup
              aria-label="Sabor"
              name="sabor"
              className={classes.group}
              value={this.state.sabor}
              onChange={this.handleChange}
            >
             {dados.sabores.map((o, i) => ( <FormControlLabel value={o.id} control={<Radio />} label={o.nome} />)) }
            </RadioGroup>
          </FormControl>
          );
      case 2:
        return (
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Extras</FormLabel>
            <RadioGroup
              aria-label="Extra"
              name="extra"
              className={classes.group}
              value={this.state.extra}
              onChange={this.handleChange}
            >
             {dados.extras.map((o, i) => ( <FormControlLabel value={o.id} control={<Radio />} label={o.nome} />)) }
            </RadioGroup>
          </FormControl>
          );
      default:
        return 'Unknown step';
    }
  }

  render() {
    const {classes, error, loading, data} = this.props
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
                  console.error(error)
                  console.log(loading)
                  console.log(data)
                  return (
                  !error && !loading && this.getStepContent(index, data)
                  )}}
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
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Acabei' : 'Pronto'}
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
