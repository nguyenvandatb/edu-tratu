var SentRequestDetail = React.createClass({
  handleCancelRequest: function(e) {
    e.preventDefault();
    this.props.handleCancelRequest(this.props.id);
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
            <a href='#' className='btn btn-primary' onClick={this.handleCancelRequest}>
              Cancel request
            </a>
          </div>
        </div>
      </div>
    );
  }
})
