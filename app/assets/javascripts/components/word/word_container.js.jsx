var WordsContainer = React.createClass({
  getInitialState: function(){
    return {
      dictionary_id: this.props.dictionary_id,
      words: this.props.words,
      dictionaries: this.props.dictionaries,
      filterText: '',
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
  parentWordSubmit: function(formData, onSuccess, onError){
    formData['dictionary_id'] = this.state.dictionary_id;
    $.ajax({
      url: '/words',
      type: 'POST',
      data: formData,
      success: function(words) {
        this.setState({words: words});
        onSuccess();
      }.bind(this),
      error: function(response, status, err) {
        onError(response.responseJSON);
      }
    });
  },
  parentUpdateWord: function(formData, onSuccess, onError){
    formData['dictionary_id'] = this.state.dictionary_id;
    $.ajax({
      url: '/words/' + formData['word']['id'],
      dataType: 'json',
      type: 'PATCH',
      data: formData,
      success: function(words) {
        this.setState({words: words});
        onSuccess();
      }.bind(this),
      error: function(response, status, err) {
        onError(response.responseJSON)
      }
    });
  },
  parentDeleteWord: function(formData){
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this word?",
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: false,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ec6c62"
    },function () {
      $.ajax({
        url: '/words/' + formData['id'],
        dataType: 'json',
        type: 'DELETE',
        data: {dictionary_id: this.state.dictionary_id},
        success: function(words) {
          this.setState({words: words, showNewForm: false});
          swal("Deleted!", "Your word was successfully deleted!", "success");
        }.bind(this),
        error: function(response, status, err) {
          swal("Oops", "We couldn't delete this word!", "error");
        }
      });
    }.bind(this));
  },
  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  },
  handleDictionaryChange(dictionary_id) {
    $.ajax({
      url: '/words/',
      dataType: 'json',
      type: 'GET',
      data: {dictionary_id: this.state.dictionary_id},
      success: function(words) {
        this.setState({words: words});
      }.bind(this),
      error: function(response, status, err) {
        swal("Oops", "We couldn't get words for this dictionary", "error");
      }
    });
  },
  render: function() {
    return(
      <div>
        <h1>Words</h1>
        <div className='row categories-action'>
          <div className='col-md-2 pull-left'>
            <SearchBar
              filterText={this.state.filterText}
              onFilterTextInput={this.handleFilterTextInput}
            />
          </div>
          <div className='col-md-2'>
            <DictionaryFilter
              dictionary_id={this.props.dictionary_id}
              onDictionaryChange={this.handleDictionaryChange}
              dictionaries={this.state.dictionaries}
            />
          </div>
        </div>
        <div className='row categories-action'>
          <div className='col-md-2 pull-right'>
            <a href="#" className='btn btn-primary pull-right' onClick={this.handleShowModal}>Add word</a>
          </div>
        </div>
        <WordTable
          words={this.state.words}
          parentUpdateWord={this.parentUpdateWord}
          parentDeleteWord={this.parentDeleteWord}
          filterText={this.state.filterText}/>
          {this.state.showModal ? <NewWordForm
          parentWordSubmit={this.parentWordSubmit}
          dictionaries={this.state.dictionaries}
          handleHideModal={this.handleHideModal}/> : null}
      </div>
    );
  }
});
