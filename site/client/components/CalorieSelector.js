import React, {Component, PropTypes} from 'react'
import * as data from '../data'

export default class CalorieSelector extends Component {
  render() {
    let levelItems = []
    data.calorieLevels.forEach((v) => {
      levelItems.push(<option value={v.val} key={v.val}>{v.disp}</option>)
    })

    return (
      <select 
      value={this.props.currentCalorieLevel}
      onChange={e => this.onLevelChange(e)} ref="calories" id="calories">
      {levelItems}
      </select>
    )
  }

  onLevelChange(e) {
    this.props.onChange(calories.value)
  }
}

CalorieSelector.propTypes = {
  currentCalorieLevel: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

