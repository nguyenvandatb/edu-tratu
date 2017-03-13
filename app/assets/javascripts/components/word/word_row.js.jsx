var WordRow = React.createClass({
  getInitialState: function(){
    return ({
      id: this.props.id,
      content: this.props.content,
      meaning: this.props.meaning,
      edit: false,
      formErrors: {}
    })
  },
  editWord: function(e){
    e.preventDefault();
    this.setState({edit: true});
  },
  cancelEdit: function(e){
    e.preventDefault();
    this.setState({
      edit: false,
      dictionary_id: this.props.dictionary_id,
      content: this.props.content,
      meaning: this.props.meaning,
      formErrors: {}});
  },
  handleContentChange: function(e){
    this.setState({content: e.target.value});
  },
  handleMeaningChange: function(e){
    this.setState({meaning: e.target.value});
  },
  handleValidationErrors: function(formErrorObject){
    this.setState({edit: true, formErrors: formErrorObject});
  },
  handleUpdate: function(){
    this.setState({edit: false, formErrors: false});
  },
  updateWord: function(e){
    e.preventDefault();
    this.props.parentUpdateWord(
      {word: {id: this.state.id, content: this.state.content,
        meaning: this.state.meaning}},
      this.handleUpdate,
      this.handleValidationErrors
    );
  },
  deleteWord: function(e) {
    e.preventDefault();
    this.props.parentDeleteWord({id: this.state.id});
  },
  renderFieldErrors: function(attribute){
    if(this.state.formErrors[attribute]){
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
  makeDictionarySelection: function(dictionary) {
    if (this.state.category_id == dictionary.id) {
      return <option value={dictionary.id} selected>{dictionary.name}</option>;
    } else {
      return <option value={dictionary.id}>{dictionary.name}</option>;
    }
  },
  renderWordContentEditFields: function(){
    var formGroupClass = this.state.formErrors["content"] ? "form-group has-error" : "form-group"
    return(
      <div className= {formGroupClass}>
        <input
          name="word[content]"
          type="string"
          placeholder="Word Content"
          value={this.state.content}
          onChange={this.handleContentChange}
          className="string form-control"
        />
        {this.renderFieldErrors("content")}
      </div>
    );
  },
  renderWordMeaningEditFields: function(){
    var formGroupClass = this.state.formErrors["meaning"] ? "form-group has-error" : "form-group"
    return(
      <div className= {formGroupClass}>
        <textarea
          name="word[meaning]"
          placeholder="Word Meaning"
          value={this.state.meaning}
          onChange={this.handleMeaningChange}
          className="text form-control"
        />
        {this.renderFieldErrors("meaning")}
      </div>
    );
  },
  render: function() {
    if(this.state.edit == false){
      return(
        <tr className="dic_row">
          <td>{this.props.index}</td>
          <td>
            {this.props.content}
          </td>
          <td>
            {this.props.meaning}
          </td>
          <td>
            <a href="#" className='btn btn-info btn-round' onClick={this.editWord}>
              <i className="fa fa-pencil"></i>
            </a>
            <a href="#" className='btn btn-danger btn-round' onClick={this.deleteWord}>
              <i className="fa fa-trash-o"></i>
            </a>
          </td>
        </tr>
      );
    } else{
      return(
        <tr className="dic_edit_form_row">
          <td>{this.props.index + 1}</td>
          <td>
            {this.renderWordContentEditFields()}
          </td>
          <td>
            {this.renderWordMeaningEditFields()}
          </td>
          <td className="col-sm-2">
            <button className='btn btn-success' onClick={this.updateWord}>Submit</button>
            <button className='btn btn-sm btn-primary' onClick={this.cancelEdit}>
              Cancel
            </button>
          </td>
        </tr>
      );
    }
  }
});
