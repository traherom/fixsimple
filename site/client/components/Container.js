import React, {Component, PropTypes} from 'react'

export default class Container extends Component {
  render() {
    const food = this.props.food == '' ? 'empty!' : this.props.food
    return (
      <container className={this.props.type}>{food}</container>
    )
  }
}

Container.propTypes = {
  type: PropTypes.string.isRequired,
  food: PropTypes.string.isRequired
}

