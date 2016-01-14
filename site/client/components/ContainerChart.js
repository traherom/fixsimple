import React, {Component, PropTypes} from 'react'
import Container from './Container'

export default class ContainerChart extends Component {
  render() {
    const containers = this.props.containers
    let containerItems = []
    for(let type in containers) {
      if(containers.hasOwnProperty(type)) {
        containers[type].forEach((food, i) => {
          containerItems.push(
            <Container
              type={type}
              food={food}
              key={type + i} />
          )
        })
      }
    }

    return (
      <div className="containers">
        {containerItems}
      </div>
    )
  }
}

ContainerChart.propTypes = {
  currentCalorieLevel: PropTypes.number.isRequired,
  containers: PropTypes.object.isRequired
}

