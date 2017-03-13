class IncomingRequestDetail extends React.Component {
  constructor(props) {
    super(props)
    this.handleAcceptRequest = this.handleAcceptRequest.bind(this)
    this.handleRejectRequest = this.handleRejectRequest.bind(this)
  }
  handleAcceptRequest(e) {
    e.preventDefault()
    this.props.handleAcceptRequest(this.props.id)
  }
  handleRejectRequest(e) {
    e.preventDefault()
    this.props.handleRejectRequest(this.props.id)
  }
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-9'>{this.props.name}</div>
        </div>
        <div className='row'>
          <div className='col-md-9'>{this.props.email}</div>
        </div>
        <div className='row'>
          <div className='col-sm-2'>
            <a href='#' className='btn btn-primary' onClick={this.handleAcceptRequest}>
              Accept
            </a>
          </div>
          <div className='col-sm-2'>
            <a href='#' className='btn btn-primary' onClick={this.handleRejectRequest}>
              Not now
            </a>
          </div>
        </div>
      </div>
    );
  }
}
