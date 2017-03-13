var IncomingRequestDetail = React.createClass({
  handleAcceptRequest: function(e) {
    e.preventDefault();
    this.props.handleAcceptRequest(this.props.id);
  },
  handleRejectRequest: function(e) {
    e.preventDefault();
    this.props.handleRejectRequest(this.props.id);
  },
  render: function() {
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
})
