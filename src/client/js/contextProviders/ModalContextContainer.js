import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ModalContextProvider } from './ModalContext'

export default class ModalContextContainer extends Component {
  static propTypes = {
    children: PropTypes.any
  }
  constructor (props) {
    super(props)

    this.state = {
      modalIsShow: false,
      sessionIdForModal: null
    }
  }
  render () {
    return (
      <ModalContextProvider value={{
        state: this.state,
        openModal: (sessionId) => {
          this.setState({
            modalIsShow: true,
            sessionIdForModal: sessionId
          })
        },
        closeModal: () => {
          this.setState({ modalIsShow: false })
        }
      }}>
        {this.props.children}
      </ModalContextProvider>
    )
  }
}
