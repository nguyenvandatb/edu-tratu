var IncomingRequest = React.createClass({
  getInitialState: function() {
    return {
      requests: [],
    };
  },
  componentWillMount: function() {
    $.ajax({
      url: '/api/invite_org_users',
      dataType: 'json',
      type: 'GET',
      data: {type: 'incoming'},
      success: function(requests) {
        this.setState({requests: requests});
      }.bind(this),
      error: function(response, status, err) {
        swal("Oops", "Connection errors", "error");
      }
    });
  },
  handleRejectRequest: function(request_id) {
    $.ajax({
      url: '/api/invite_org_users/' + request_id,
      dataType: 'json',
      type: 'DELETE',
      data: {},
      success: function(rejectedRequest) {
        var requests = this.state.requests.filter(function(request) {
          return request.id !== rejectedRequest.id
        });
        this.setState({requests: requests});
        this.props.parentHandleIncomingRequest(this.state.requests)
      }.bind(this),
      error: function(response, status, err) {
        swal("Oops", "We couldn't reject this request!", "error");
      }
    });
  },
  handleAcceptRequest: function(request_id) {
    $.ajax({
      url: '/api/invite_org_users/' + request_id,
      dataType: 'json',
      type: 'DELETE',
      data: {type: 'accept'},
      success: function(acceptedRequest) {
        var requests = this.state.requests.filter(function(request) {
          return request.id !== acceptedRequest.id
        });
        this.setState({requests: requests});
        this.props.parentHandleIncomingRequest(this.state.requests)
      }.bind(this),
      error: function(response, status, err) {
        swal("Oops", "We couldn't accept this request!", "error");
      }
    });
  },
  renderRequests: function() {
    return (
      this.state.requests.map(function(request){
        return(
          <IncomingRequestDetail
            key={request.id}
            id={request.id}
            name={request.organization.name}
            description={request.organization.description}
            handleAcceptRequest={this.handleAcceptRequest}
            handleRejectRequest={this.handleRejectRequest}
          />
        );
      }.bind(this))
    );
  },
  render: function() {
    return (
      <div>
        {this.renderRequests()}
      </div>
    );
  }
})
