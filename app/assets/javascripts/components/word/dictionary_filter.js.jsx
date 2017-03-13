var DictionaryFilter = React.createClass({
  handleDictionaryChange(e) {
    this.props.onDictionaryChange(e.target.value);
  },
  makeDictionarySelection: function(dictionary){
    return <option key={dictionary.id} value={dictionary.id}>{dictionary.name}</option>;
  },
  render() {
    return (
      <select className="form-control" name="dictionary_filter"
        onChange={this.handleDictionaryChange} value={this.props.dictionary_id}>
          {this.props.dictionaries.map(this.makeDictionarySelection)}
      </select>
    );
  }
});
