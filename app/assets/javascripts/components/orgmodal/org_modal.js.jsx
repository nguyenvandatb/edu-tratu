var tabList = [
  { 'id': 1, 'title': 'User Search' },
  { 'id': 2, 'title': 'Organization Search'},
  { 'id': 3, 'title': 'Sent Request' },
  { 'id': 4, 'title': 'Incoming Request' }
];

var OrgModal = React.createClass({
  getInitialState: function () {
    return {
      tabList: tabList,
      currentTab: 1,
      numberSentRequest: 1,
      numberIncomingRequest: 1
    };
  },
  componentWillMount: function() {
    $.ajax({
      url: '/api/invite_org_users',
      dataType: 'json',
      type: 'GET',
      data: {},
      success: function(detail) {
        this.updateSendRequestLink(detail.send_requests);
        this.updateIncomingRequestLink(detail.incoming_requests);
      }.bind(this),
      error: function(response, status, err) {
      }
    });
  },
  updateSendRequestLink: function(requests) {
    this.setState({numberSentRequest: requests.length})
    var tabList = this.state.tabList;
    tabList[2].title = 'Sent Request' + '(' + this.state.numberSentRequest + ')'
    this.setState({tabList: tabList});
  },
  updateIncomingRequestLink: function(requests) {
    this.setState({numberIncomingRequest: requests.length})
    var tabList = this.state.tabList;
    tabList[3].title = 'Incoming Request' + '(' + this.state.numberIncomingRequest + ')'
    this.setState({tabList: tabList});
  },
  componentDidMount(){
     $(ReactDOM.findDOMNode(this)).modal('show');
     $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
  },
  changeTab: function(tab) {
    this.setState({ currentTab: tab.id });
  },
  parentHandleSendRequest: function(requests) {
    this.updateSendRequestLink(requests);
  },
  parentHandleIncomingRequest: function(requests) {
    this.updateIncomingRequestLink(requests);
  },
  render() {
    return (
      <div className='modal fade'>
        <div className='modal-dialog' role='document'>
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
              {this.state.currentTab === 1 ? <UserTab
                parentHandleSendRequest={this.parentHandleSendRequest}/> : null}
              {this.state.currentTab === 2 ? <div>Tab 2</div> : null}
              {this.state.currentTab === 3 ? <div><SentRequest
                parentHandleSendRequest={this.parentHandleSendRequest}/></div> : null}
              {this.state.currentTab === 4 ? <div><IncomingRequest
                parentHandleIncomingRequest={this.parentHandleIncomingRequest}/></div> : null}
             </div>
            <div className='modal-footer'>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
