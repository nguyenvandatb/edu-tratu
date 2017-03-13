var DictionariesContainer = React.createClass({
  getInitialState: function(){
    return {
      dictionaries: this.props.dictionaries,
      categories: this.props.categories,
      showModal: false
    }
  },
  handleHideModal: function(){
    this.setState({
      showModal: false
    })
  },
  handleShowModal: function(){
    this.setState({
      showModal: true
    })
  },
  parentDictionarySubmit: function(url, formData, onSuccess, onError){
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: formData,
      success: function(successData) {
        if (successData['dictionaries'] && successData['categories']) {
          this.setState({dictionaries: successData['dictionaries']});
          this.setState({categories: successData['categories']});
        } else {
          this.setState({dictionaries: successData});
        }
        onSuccess();
      }.bind(this),
      error: function(response, status, err) {
        console.log(response.responseJSON);
        onError(response.responseJSON);
      }
    });
  },
  parentUpdateDictionary: function(formData, onSuccess, onError){
    $.ajax({
      url: ('/dictionaries/' + formData['dictionary']['id']),
      dataType: 'json',
      type: 'PATCH',
      data: formData,
      success: function(dictionaries) {
        this.setState({dictionaries: dictionaries, showNewForm: false});
        onSuccess();
      }.bind(this),
      error: function(response, status, err) {
        onError(response.responseJSON)
      }
    });
  },
  parentDeleteDictionary: function(formData){
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this dictionary?",
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: false,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ec6c62"
    },function () {
      $.ajax({
        url: ('/dictionaries/' + formData['id']),
        dataType: 'json',
        type: 'DELETE',
        data: {},
        success: function(dictionaries) {
          this.setState({dictionaries: dictionaries, showNewForm: false});
          swal("Deleted!", "Your dictionary was successfully deleted!", "success");
        }.bind(this),
        error: function(response, status, err) {
          swal("Oops", "We couldn't delete this dictionary!", "error");
        }
      });
    }.bind(this));
  },
  render: function() {
    return(
      <div>
        <h1> Dictionary List </h1>
        <div className='row dictionaries-action'>
          <div className='col-md-2 pull-right'>
            <a href="#" className='btn btn-primary pull-right' onClick={this.handleShowModal}>Add dictionary</a>
          </div>
        </div>
        <DictionaryTable
          dictionaries={this.state.dictionaries}
          categories={this.state.categories}
          parentUpdateDictionary={this.parentUpdateDictionary}
          parentDeleteDictionary={this.parentDeleteDictionary} />
        {this.state.showModal ? <NewDictionaryForm
          parentDictionarySubmit={this.parentDictionarySubmit}
          categories={this.state.categories}
          user_id={this.props.user_id}
          handleHideModal={this.handleHideModal}/> : null}
      </div>
    );
  }
});
