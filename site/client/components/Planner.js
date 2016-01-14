import React, {Component, PropTypes} from 'react'
import ContainerChart from './ContainerChart'
import CalorieSelector from './CalorieSelector'
import * as data from '../data'

export default class WeeklyPlanner extends Component {
    render() {
      return (
        <div className="weeklyplanner">
          <CalorieSelector 
            currentCalorieLevel={this.props.people[this.props.currentPerson].level}
            onChange={this.props.onCalorieLevelChange} />
          <DailyPlanner 
            person={this.props.people[this.props.currentPerson]}
            onCalorieLevelChange={this.props.onCalorieLevelChange} />
        </div>
      )
    }
}

WeeklyPlanner.propTypes = {
  people: PropTypes.array.isRequired,
  currentPerson: PropTypes.number.isRequired,

  onCalorieLevelChange: PropTypes.func.isRequired,
  formIssues: PropTypes.array.isRequired,
}

export class DailyPlanner extends Component {
  render() {
    return (
      <div className="dailyplanner">
        <ContainerChart
          currentCalorieLevel={this.props.person.level}
          containers={this.props.person.containers} />
      </div>
    )
  }
}

DailyPlanner.propTypes = {
  person: PropTypes.object.isRequired,
  onCalorieLevelChange: PropTypes.func.isRequired
}

