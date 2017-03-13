var SentRequest = React.createClass({
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
      data: {type: 'send'},
      success: function(requests) {
        this.setState({requests: requests});
      }.bind(this),
      error: function(response, status, err) {
        swal("Oops", "Connection errors", "error");
      }
    });
  },
  handleCancelRequest: function(request_id) {
    $.ajax({
      url: '/api/invite_org_users/' + request_id,
      dataType: 'json',
      type: 'DELETE',
      data: {},
      success: function(canceledRequest) {
        var requests = this.state.requests.filter(function(request) {
          return request.id !== canceledRequest.id
        });
        this.setState({requests: requests});
        this.props.parentHandleSendRequest(this.state.requests)
      }.bind(this),
      error: function(response, status, err) {
        swal("Oops", "We couldn't cancel this request!", "error");
      }
    });
  },
  renderRequests: function() {
    return (
      this.state.requests.map(function(request){
        return(
          <SentRequestDetail
            key={request.id}
            id={request.id}
            name={request.user.name}
            email={request.user.email}
            handleCancelRequest={this.handleCancelRequest}
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
