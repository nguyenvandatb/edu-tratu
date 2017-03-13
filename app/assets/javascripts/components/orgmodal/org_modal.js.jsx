var tabList = [
  { 'id': 1, 'title': 'User Search' },
  { 'id': 2, 'title': 'Organization Search'},
  { 'id': 3, 'title': 'Sent Invitation' },
  { 'id': 4, 'title': 'Incoming Invitation' },
  { 'id': 5, 'title': 'Sent Join Request' },
  { 'id': 6, 'title': 'Incoming Join Request' }
];

var OrgModal = React.createClass({
  getInitialState: function () {
    return {
      currentTab: 1,
      tabList: tabList
    };
  },
  componentWillMount() {
    var tabList = this.state.tabList;
    tabList[2].title = 'Sent Invitation' + '(' + this.props.sentInvitations.length + ')'
    tabList[3].title = 'Incoming Invitation' + '(' + this.props.incomingInvitations.length + ')'
    tabList[4].title = 'Sent Join Request' + '(' + this.props.sentRequests.length + ')'
    tabList[5].title = 'Incoming Join Request' + '(' + this.props.incomingRequests.length + ')'
    this.setState({tabList: tabList});
  },
  componentWillReceiveProps(nextProps) {
    var tabList = this.state.tabList;
    tabList[2].title = 'Sent Invitation' + '(' + nextProps.sentInvitations.length + ')'
    tabList[3].title = 'Incoming Invitation' + '(' + nextProps.incomingInvitations.length + ')'
    tabList[4].title = 'Sent Join Request' + '(' + nextProps.sentRequests.length + ')'
    tabList[5].title = 'Incoming Join Request' + '(' + nextProps.incomingRequests.length + ')'
    this.setState({tabList: tabList});
  },
  updateSentInvitationLink: function() {
    var tabList = this.state.tabList;
    tabList[2].title = 'Sent Invitation' + '(' + this.props.sentInvitations.length + ')'
    this.setState({tabList: tabList});
  },
  updateIncomingInvitationLink: function() {
    var tabList = this.state.tabList;
    tabList[3].title = 'Incoming Invitation' + '(' + this.props.incomingInvitations.length + ')'
    this.setState({tabList: tabList});
  },
  updateSentRequestLink: function() {
    var tabList = this.state.tabList;
    tabList[4].title = 'Sent Join Request' + '(' + this.props.sentRequests.length + ')'
    this.setState({tabList: tabList});
  },
  updateIncomingRequestLink: function() {
    var tabList = this.state.tabList;
    tabList[5].title = 'Incoming Join Request' + '(' + this.props.incomingRequests.lengths + ')'
    this.setState({tabList: tabList});
  },
  componentDidMount(){
     $(ReactDOM.findDOMNode(this)).modal('show');
     $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
  },
  changeTab: function(tab) {
    this.setState({ currentTab: tab.id });
  },
  render() {
    return (
      <div className='modal fade bs-example-modal-lg'>
        <div className='modal-dialog modal-lg' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'
                aria-label='Close'><span aria-hidden='true'>&times;</span>
              </button>
              <h3>Organization</h3>
            </div>
            <div className='modal-body'>
              <Tabs
                currentTab={this.state.currentTab}
                tabList={this.state.tabList}
                changeTab={this.changeTab}
              />
              {this.state.currentTab === 1 ? <SearchUserTab/> : null}
              {this.state.currentTab === 2 ? <SearchOrgTab/> : null}
              {this.state.currentTab === 3 ? <SentInvite
                sentInvitations={this.props.sentInvitations}/> : null}
              {this.state.currentTab === 4 ? <IncomingInvite
                incomingInvitations={this.props.incomingInvitations}/> : null}
              {this.state.currentTab === 5 ? <SentRequest
                sentRequests={this.props.sentRequests}/> : null}
              {this.state.currentTab === 6 ? <IncomingRequest
                incomingRequests={this.props.incomingRequests}/> : null}
             </div>
            <div className='modal-footer'>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
