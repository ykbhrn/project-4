import React from 'react'
import { getAllSports } from '../../lib/api'


class SportSelect extends React.Component {

  state = {
    sports: null
  }

  async componentDidMount() {
    try {
      const res = await getAllSports()
      this.setState({ sports: res.data })
    } catch (err) {
      console.log(err)
    }
  }


  render() {
    if (!this.state.sports) return null
    console.log(this.state.sports)

    return (
      <div className="select is-multiple">
        <select multiple size="3"
          onClick={this.props.handleSelect}
          name="sports"
        >
          {this.state.sports.map(sport => ( 
            <option 
              key={sport.id}
              value={sport.id}
            >{sport.name}</option>
          ))}
        </select>
      </div>
    )
  }

}
export default SportSelect