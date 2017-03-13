var Header = React.createClass({
  getInitialState: function(){
    return {
      categories: this.props.categories,
      signedIn: null,
      showModal: false,
      user: null
    }
  },
  componentWillMount: function(){
    $.ajax({
      method: 'GET',
      url: '/auth',
      dataType: 'json',
      success: function(data){
      this.setState({
        signedIn: data.signed_in,
        user: data.signed_in ? data.user.name : null
      })
      }.bind(this),
      error: function(xhr, status, err){
        console.error('/auth', status, err.toString());
      }
    })
  },
  handleHideModal: function(){
    this.setState({
      showModal: false
    });
  },
  handleShowModal: function(){
    this.setState({
      showModal: true,
    });
  },
  onClick: function(e){
    e.preventDefault()
    this.setState({
      showModal: true,
    });
  },
  _signOut: function(e) {
    $.ajax({
      method: 'delete',
      url: '/users/sign_out'
    }).done(function(){
      location.reload();
    })
  },
  render: function(){
    let login = (
      <li><a href='' className='btn-login' onClick={this.onClick}>
        <i className='fa fa-user'></i>Login</a>
      </li>
    )
    let logout = (
        <li><a href='' className='btn-login' onClick={this._signOut}>
          <i className='fa fa-user'></i>Logout</a>
        </li>
    )
    let user = (
      <li className='welcome'>
        <a href="#" className='dropdown-toggle' data-toggle='dropdown'
          role='button' aria-haspopup='true' aria-expanded='false'>Welcome {this.state.user}
            <span className='caret'></span>
        </a>
        <ul className='dropdown-menu'>
          <li><a href="/organizations">Organizations</a></li>
          <li><a href="/categories">Categories</a></li>
          <li><a href="/dictionaries">Dictionaries</a></li>
          <li><a href='/words'>Words</a></li>
        </ul>
      </li>
    )

    return(
      <div className='header-container'>
        <header>
          <nav className='navbar navbar-default'>
            <div className='container-fluid'>
              <div className='navbar-header'>
                <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
                 <span className='sr-only'></span>
                 <span className='icon-bar'></span>
                 <span className='icon-bar'></span>
                 <span className='icon-bar'></span>
                  </button>
              </div>
              <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
                <ul className='nav navbar-nav'>
                  <li><a href='/dictionaries'>Dictionary</a></li>
                  <li><a href=''>About</a></li>
                  <li><a href=''>Contact</a></li>
                </ul>
                <ul className='nav navbar-nav navbar-right'>
                  {this.state.signedIn ? user : null}
                  {this.state.signedIn ? logout : login}
                  <li>
                    <ul className='social'>
                      <li><a href='#' className='icon-facebook'><i className='fa fa-facebook'></i></a></li>
                      <li><a href="" className='icon-google'><i className='fa fa-google-plus'></i></a></li>
                      <li><a href="#" className='icon-twitter'><i className='fa fa-twitter'></i></a></li>
                      <li><a href="#" className='icon-instagram'><i className='fa fa-instagram'></i></a></li>
                      <li><a href="#" className='icon-youtube'><i className='fa fa-youtube'></i></a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div className='header-main'>
          <div className='search-container'>
            <Search categories = {this.state.categories} signedIn={this.state.signedIn}/>
          </div>
        </div>
        {this.state.showModal ? <Login handleHideModal={this.handleHideModal} /> : null}
      </div>
    )
  }
})
