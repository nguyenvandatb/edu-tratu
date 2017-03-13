class SentRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleCancelRequest = this.handleCancelRequest.bind(this)
    this.renderRequests = this.renderRequests.bind(this)
  }
  handleCancelRequest(request_id) {
    $.ajax({
      url: '/api/requests/' + request_id,
      dataType: 'json',
      type: 'DELETE',
      data: {},
      success: function() {
      }.bind(this),
      error: function(response, status, err) {
        swal("Oops", "We couldn't cancel this request!", "error")
      }
    })
  }
  renderRequests() {
    return (
      this.props.sentRequests.map((request) =>
        <SentRequestDetail
          key={request.id}
          id={request.id}
          name={request.organization.name}
          description={request.organization.description}
          handleCancelRequest={this.handleCancelRequest}
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
