var SentInvite = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleCancelInvitation: function(invitation_id) {
    $.ajax({
      url: '/api/invitations/' + invitation_id,
      dataType: 'json',
      type: 'DELETE',
      data: {},
      success: function() {

      }.bind(this),
      error: function(response, status, err) {
        swal("Oops", "We couldn't cancel this invitation!", "error");
      }
    });
  },
  renderInvitation: function() {
    return (
      this.props.sentInvitations.map(function(invitation){
        return(
          <SentInviteDetail
            key={invitation.id}
            id={invitation.id}
            name={invitation.user.name}
            email={invitation.user.email}
            handleCancelInvitation={this.handleCancelInvitation}
          />
        );
      }.bind(this))
    );
  },
  render: function() {
    return (
      <div>
        {this.renderInvitation()}
      </div>
    );
  }
})
