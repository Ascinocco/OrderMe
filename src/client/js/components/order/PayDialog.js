import React from "react";
import { Textfield, Dialog, IconButton, Button, DialogTitle, DialogContent, DialogActions } from 'react-mdl';
import { inject } from "mobx-react"

@inject('dishStore')
@inject('orderStore')
export default class OrderPayDialog extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      amountPayed: "",
    }
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }

  setAmountPayed(e){
    this.setState({amountPayed : e.target.value})
  }

  payBill(){
    this.props.orderStore.remove(this.props.id, () => {}, (err) => {console.error(err)})
  }

  render() {
    const total = this.props.dishes.reduce((acc, val) => {
      const dish = this.props.dishStore.getDish(val.id)
      return acc + (val.quantity * (dish ? dish.cost : 0))
    }, 0).toFixed(2);

    const amountPayed = this.state.amountPayed ? parseFloat(this.state.amountPayed.replace(',', '.')).toFixed(2) : undefined
    const isNumber = this.state.amountPayed && !isNaN(amountPayed)
    const change = isNumber ? (amountPayed - total).toFixed(2) : undefined
    const payedFull = change >= 0
    const className = payedFull ? "success" : "error"

    const changeLabel = payedFull ? "Change" : "Missing"
    return(
      <div>
        <IconButton name="payment" onClick={this.handleOpenDialog} />
        <Dialog open={this.state.openDialog}>
          <DialogTitle>Payment</DialogTitle>
          <DialogContent>
            <Textfield
              disabled
              label="Total"
              floatingLabel
              value={ total }
            />

            <div class={className}>
              <Textfield
                disabled
                onClick= {() => {}}
                label="Change"
                floatingLabel
                value={change}
              />
            </div> 
            <Textfield
              onChange={this.setAmountPayed.bind(this)}
              pattern="-?[0-9]*([\.,][0-9]+)?"
              error="Input is not a number!"
              label="Amount Payed"
              floatingLabel
              value={ this.state.amountPayed }
            />
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={this.payBill.bind(this)} accent>Pay</Button>
            <Button type='button' onClick={this.handleCloseDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}