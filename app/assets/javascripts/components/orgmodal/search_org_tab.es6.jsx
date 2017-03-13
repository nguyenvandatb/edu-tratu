class SearchOrgTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterText: '',
      orgs: []
    }
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this)
    this.handleSendRequest = this.handleSendRequest.bind(this)
    this.renderSearchBar = this.renderSearchBar.bind(this)
    this.renderOrgs = this.renderOrgs.bind(this)
  }
  handleFilterTextInputChange(e) {
    this.setState({filterText: e.target.value})
    $.ajax({
      url: '/api/organizations',
      dataType: 'json',
      type: 'GET',
      data: {type: 'other_org', q: e.target.value},
      success: function(orgs) {
        this.setState({orgs: orgs})
      }.bind(this),
      error: function(response, status, err) {
      }
    })
  }
  handleSendRequest(requestData) {
    swal({
      title: "Are you sure?",
      text: "Are you sure to join this organization?",
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: "Yes!",
      confirmButtonColor: "#ec6c62"
    },function () {
      $.ajax({
        url: '/api/requests',
        dataType: 'json',
        type: 'POST',
        data: requestData,
        success: function(orgs) {
          this.setState({orgs: orgs});
        }.bind(this),
        error: function(response, status, err) {
          swal("Oops", "We couldn't send this request!", "error")
        }
      })
    }.bind(this))
  }
  renderSearchBar() {
    return (
      <form>
        <input
          className="form-control"
          type="text"
          placeholder="Enter organization name"
          value={this.state.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    )
  }
  renderOrgs() {
    return (
      this.state.orgs.map((org) =>
        <SearchOrgDetail
          key={org.id}
          id={org.id}
          name={org.name}
          description={org.description}
          handleSendRequest={this.handleSendRequest}
          filterText={this.state.filterText}
        />
      )
    )
  }
  render() {
    return(
      <div>
        <div className='row'>
          <div className='col-md-5 pull-left'>
            {this.renderSearchBar()}
          </div>
        </div>
        {this.renderOrgs()}
      </div>
    );
  }
}
