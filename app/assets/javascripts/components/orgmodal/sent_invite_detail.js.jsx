var SentInviteDetail = React.createClass({
  handleCancelInvitation: function(e) {
    e.preventDefault();
    this.props.handleCancelInvitation(this.props.id);
  },
  render: function() {
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
            <a href='#' className='btn btn-primary' onClick={this.handleCancelInvitation}>
              Cancel invitation
            </a>
          </div>
        </div>
      </div>
    );
  }
})
