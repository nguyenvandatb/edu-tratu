class IncomingRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleRejectRequest = this.handleRejectRequest.bind(this)
    this.handleAcceptRequest = this.handleAcceptRequest.bind(this)
    this.renderRequests = this.renderRequests.bind(this)
  }
  handleRejectRequest(request_id) {
    $.ajax({
      url: '/api/requests/' + request_id,
      dataType: 'json',
      type: 'DELETE',
      data: {},
      success: function(rejectedRequest) {

      }.bind(this),
      error: function(response, status, err) {
        swal("Oops", "We couldn't reject this request!", "error")
      }
    })
  }
  handleAcceptRequest(request_id) {
    $.ajax({
      url: '/api/requests/' + request_id,
      dataType: 'json',
      type: 'DELETE',
      data: {type: 'accept'},
      success: function() {

      }.bind(this),
      error: function(response, status, err) {
        swal("Oops", "We couldn't accept this request!", "error")
      }
    })
  }
  renderRequests() {
    return (
      this.props.incomingRequests.map((request) =>
        <IncomingRequestDetail
          key={request.id}
          id={request.id}
          name={request.user.name}
          email={request.user.email}
          handleAcceptRequest={this.handleAcceptRequest}
          handleRejectRequest={this.handleRejectRequest}
        />
      )
    )
  }
  render() {
    return (
      <div>
        {this.renderRequests()}
      </div>
    )
  }
}
