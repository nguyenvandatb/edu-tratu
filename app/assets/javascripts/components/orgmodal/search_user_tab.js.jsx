var SearchUserTab = React.createClass({
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
      data: {type: 'my_org'},
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
      }
    });
  },
  handleSendInvitation: function(invitationsData) {
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
        url: '/api/invitations',
        dataType: 'json',
        type: 'POST',
        data: invitationsData,
        success: function(users) {
          this.setState({users: users});
        }.bind(this),
        error: function(response, status, err) {
          swal("Oops", "We couldn't send this invitation!", "error");
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
          placeholder="Enter user name"
          value={this.state.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  },
  renderUsers: function() {
    return (
      this.state.users.map(function(user){
        return(
          <SearchUserDetail
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            organizations={this.state.organizations}
            handleSendInvitation={this.handleSendInvitation}
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
