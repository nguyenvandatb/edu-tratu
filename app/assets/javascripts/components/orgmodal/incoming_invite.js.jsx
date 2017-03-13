var IncomingInvite = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleRejectInvitation: function(invitation_id) {
    $.ajax({
      url: '/api/invitations/' + invitation_id,
      dataType: 'json',
      type: 'DELETE',
      data: {},
      success: function() {

      }.bind(this),
      error: function(response, status, err) {
        swal("Oops", "We couldn't reject this invitation!", "error");
      }
    });
  },
  handleAcceptInvitation: function(invitation_id) {
    $.ajax({
      url: '/api/invitations/' + invitation_id,
      dataType: 'json',
      type: 'DELETE',
      data: {type: 'accept'},
      success: function() {

      }.bind(this),
      error: function(response, status, err) {
        swal("Oops", "We couldn't accept this invitation!", "error");
      }
    });
  },
  renderInvitations: function() {
    return (
      this.props.incomingInvitations.map(function(invitation){
        return(
          <IncomingInviteDetail
            key={invitation.id}
            id={invitation.id}
            name={invitation.organization.name}
            description={invitation.organization.description}
            handleAcceptInvitation={this.handleAcceptInvitation}
            handleRejectInvitation={this.handleRejectInvitation}
          />
        );
      }.bind(this))
    );
  },
  render: function() {
    return (
      <div>
        {this.renderInvitations()}
      </div>
    );
  }
})
