class SearchOrgDetail extends React.Component {
  constructor(props) {
    super(props)
    this.handleOrganizationChange = this.handleOrganizationChange.bind(this)
    this.handleSendRequest = this.handleSendRequest.bind(this)
  }
  handleOrganizationChange(e) {
    this.setState({organization_id: e.target.value});
  }
  handleSendRequest(e) {
    e.preventDefault()
    requestData = {request: {organization_id: this.props.id},
                   q: this.props.filterText}
    this.props.handleSendRequest(requestData);
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
            <a href='#' className='btn btn-primary' onClick={this.handleSendRequest}>
              Send
            </a>
          </div>
        </div>
      </div>
    );
  }
}
