var UserTab = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      users: [],
      organizations: []
    };
  },
  componentWillMount: function() {
    $.ajax({
      url: '/api/organizations',
      dataType: 'json',
      type: 'GET',
      data: {},
      success: function(organizations) {
        this.setState({organizations: organizations});
      }.bind(this),
      error: function(response, status, err) {
        swal("Oops", "Connection errors", "error");
      }
    });
  },
  handleFilterTextInputChange(e) {
    this.setState({filterText: e.target.value});
    $.ajax({
      url: '/api/users',
      dataType: 'json',
      type: 'GET',
      data: {q: e.target.value},
      success: function(users) {
        this.setState({users: users});
      }.bind(this),
      error: function(response, status, err) {
        // swal("Oops", "We couldn't get the users you want", "error");
      }
    });
  },
  handleSendRequest: function(requestData) {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to invite this user?",
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: "Yes!",
      confirmButtonColor: "#ec6c62"
    },function () {
      $.ajax({
        url: '/api/invite_org_users',
        dataType: 'json',
        type: 'POST',
        data: requestData,
        success: function(detail) {
          this.setState({users: detail.users});
          this.props.parentHandleSendRequest(detail.requests);
          swal("Send!", "Your request is sent!", "success");
        }.bind(this),
        error: function(response, status, err) {
          swal("Oops", "We couldn't send this request!", "error");
        }
      });
    }.bind(this));
  },
  renderSearchBar: function() {
    return (
      <form>
        <input
          className="form-control"
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  },
  renderUsers: function() {
    return (
      this.state.users.map(function(user){
        return(
          <UserDetail
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            organizations={this.state.organizations}
            handleSendRequest={this.handleSendRequest}
            filterText={this.state.filterText}
          />
        );
      }.bind(this))
    );
  },
  render: function() {
    return(
      <div>
        <div className='row'>
          <div className='col-md-5 pull-left'>
            {this.renderSearchBar()}
          </div>
        </div>
        {this.renderUsers()}
      </div>
    );
  }
});
