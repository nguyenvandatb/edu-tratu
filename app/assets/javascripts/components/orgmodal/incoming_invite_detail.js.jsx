var IncomingInviteDetail = React.createClass({
  handleAcceptInvitation: function(e) {
    e.preventDefault();
    this.props.handleAcceptInvitation(this.props.id);
  },
  handleRejectInvitation: function(e) {
    e.preventDefault();
    this.props.handleRejectInvitation(this.props.id);
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
            <a href='#' className='btn btn-primary' onClick={this.handleAcceptInvitation}>
              Accept
            </a>
          </div>
          <div className='col-sm-2'>
            <a href='#' className='btn btn-primary' onClick={this.handleRejectInvitation}>
              Not now
            </a>
          </div>
        </div>
      </div>
    );
  }
})
