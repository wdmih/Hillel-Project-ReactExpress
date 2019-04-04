import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

// styles
import '../assets/styles/main.scss'

// context providers
import ModalContextContainer from './contextProviders/ModalContextContainer'
import { ModalContextConsumer } from './contextProviders/ModalContext'

// components
import Header from './views/components/Header'
import Modal from './views/components/Modal'

// Lazy loading page components
const MainPage = React.lazy(() => import('./views/pages/Main-Page'))
const MovieDetailPage = React.lazy(() => import('./views/pages/Movie-Detail-Page'))
const SchedulePage = React.lazy(() => import('./views/pages/Schedule-Page'))
const AdminPage = React.lazy(() => import('./views/pages/Admin-Page.js'))

export default class App extends Component {
  render () {
    return (
      <section className="page-container">
        <ModalContextContainer>
          <Header />
          <section className="main">
            <React.Suspense fallback={<p>Please wait</p>}>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/detail/:slug" component={MovieDetailPage}/>
                <Route path="/schedule" component={SchedulePage} />
                <Route path="/admin-panel" component={AdminPage}/>
              </Switch>
            </React.Suspense>
          </section>
          <ModalContextConsumer>
            {context => context.state.modalIsShow && <Modal context={context}/>}
          </ModalContextConsumer>
        </ModalContextContainer>
      </section>
    )
  }
}
