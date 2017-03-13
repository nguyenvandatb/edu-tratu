class SentRequestDetail extends React.Component {
  constructor(props) {
    super(props)
    this.handleCancelRequest = this.handleCancelRequest.bind(this)
  }
  handleCancelRequest(e) {
    e.preventDefault()
    this.props.handleCancelRequest(this.props.id)
  }
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-9'>{this.props.name}</div>
        </div>
        <div className='row'>
          <div className='col-md-9'>{this.props.description}</div>
        </div>
        <div className='row'>
          <div className='col-sm-2'>
            <a href='#' className='btn btn-primary' onClick={this.handleCancelRequest}>
              Cancel request
            </a>
          </div>
        </div>
      </div>
    )
  }
}
