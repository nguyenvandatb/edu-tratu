var NewWordForm = React.createClass({
  getInitialState: function(){
    return {
      dictionary_id: this.props.dictionary_id,
      content: '',
      meaning: '',
      added: false,
      added_from_file: false,
      added_from_file_failed: false,
      file: {},
      formErrors: {}
    };
  },
  componentDidMount(){
     $(ReactDOM.findDOMNode(this)).modal('show');
     $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
  },
  resetState: function() {
    this.setState({
      content: "",
      meaning: "",
      formErrors: {}
    });
  },
  onFileSuccess: function(words) {
    this.props.parentOnFileSuccess(words);
    this.resetState();
    this.setState({
      added_from_file: true,
      added: false,
      added_from_file_failed: false
    });
  },
  onFileError: function() {
    this.resetState();
    this.setState({
      added_from_file: false,
      added: false,
      added_from_file_failed: true
    });
  },
  onSuccess: function(){
    this.resetState();
    this.setState({
      added_from_file: false,
      added: true,
      added_from_file_failed: false}
    );
  },
  handleValidationError: function(formErrorObj){
    this.setState({formErrors: formErrorObj});
  },
  newWordSubmit: function(e){
    e.preventDefault();
    if (this.refs.file_input.state.file) {
      this.refs.file_input.beginUpload()
    } else {
      var formData = {word: {
        dictionary_id: this.state.dictionary_id,
        content: this.state.content,
        meaning: this.state.meaning
      }};
      this.props.parentWordSubmit(
        formData,
        this.onSuccess,
        this.handleValidationError
      );
    }
  },
  handleDictionaryChange: function(e){
    this.setState({dictionary_id: e.target.value});
  },
  handleContentChange: function(e){
    this.setState({content: e.target.value});
  },
  handleMeaningChange: function(e){
    this.setState({meaning: e.target.value});
  },
  renderFieldErrors: function(attribute, isDictionary){
    if (this.state.formErrors[attribute]){
      return(
        this.state.formErrors[attribute].map(function(error, i){
          return(
            <span key={i} className="help-block">
              {error}
            </span>
          );
        })
      );
    } else{
      return "";
    }
  },
  makeDictionarySelection: function(dictionary){
    return <option key={dictionary.id} value={dictionary.id}>{dictionary.name}</option>;
  },
  renderWordAddedSuccess: function(){
    if (this.state.added) {
      return (
        <div className='row'>
          <div className='col-sm-12 alert alert-success'>
            <strong>Create new word successfully!</strong>
          </div>
        </div>
      );
    } else {
      return "";
    }
  },
  renderWordAddedFromFileSuccess: function(){
    if (this.state.added_from_file) {
      return (
        <div className='row'>
          <div className='col-sm-12 alert alert-success'>
            <strong>Create words from file successfully!</strong>
          </div>
        </div>
      );
    } else {
      return "";
    }
  },
  renderWordAddedFromFileFail: function(){
    if (this.state.added_from_file_failed) {
      return (
        <div className='row'>
          <div className='col-sm-12 alert alert-danger'>
            <strong>Creating words from file failed!</strong>
          </div>
        </div>
      );
    } else {
      return "";
    }
  },
  renderDictionaryCategoryFields: function(){
    return (
      <select className="form-control form-group" name="word[dictionary_id]"
        onChange={this.handleDictionaryChange} value={this.state.dictionary_id}>
          {this.props.dictionaries.map(this.makeDictionarySelection)}
      </select>
    );
  },
  renderWordContentField: function(){
    var formGroupClass = this.state.formErrors["content"] ?
      "form-group has-error" : "form-group";
    return (
      <div className= {formGroupClass}>
        <input
          name="word[content]"
          type="string"
          placeholder="Word Content"
          value={this.state.content}
          onChange={this.handleContentChange}
          className="form-control"
        />
        {this.renderFieldErrors("content", true)}
      </div>
    );
  },
  renderWordMeaningField: function(){
    var formGroupClass = this.state.formErrors["meaning"] ?
      "form-group has-error" : "form-group";
    return(
      <div className={formGroupClass}>
        <textarea
          name="word[meaning]"
          placeholder="Word Meaning"
          value={this.state.meaning}
          onChange={this.handleMeaningChange}
          className="text form-control"
        />
        {this.renderFieldErrors("meaning", true)}
      </div>
    );
  },
  render: function(){
    return(
      <div className='modal fade'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                <h3>Add Word</h3>
              </div>
              <div className='modal-body'>
                <form className= 'form_body' onSubmit={this.newWordSubmit} encType="multipart/form-data">
                  <div className='form-inputs'/>
                    {this.renderDictionaryCategoryFields()}
                    {this.renderWordContentField()}
                    {this.renderWordMeaningField()}
                    <div className='row'>
                      <div className='col-sm-12'>
                        <FileUploadInput
                          ref="file_input"
                          dictionary_id={this.state.dictionary_id}
                          onFileSuccess={this.onFileSuccess}
                          onFileError={this.onFileError}
                          url="/import"/>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-sm-4'>
                        <input type="submit" value="Save" className='btn btn-primary' />
                      </div>
                    </div>
                    {this.renderWordAddedSuccess()}
                    {this.renderWordAddedFromFileSuccess()}
                    {this.renderWordAddedFromFileFail()}
                </form>
                </div>
            <div className='modal-footer'>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
