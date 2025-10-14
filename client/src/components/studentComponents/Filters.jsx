export default function Filters({ selectedTerm, setSelectedTerm, selectedClass, setSelectedClass }) {
  const terms = ['first_term', 'second_term', 'third_term'];
  const classes = ['Grade 10', 'Grade 11', 'Grade 12'];

  return (
    <div className="flex flex-wrap gap-4 mb-6 h-4">
      <select value={selectedTerm} onChange={e => setSelectedTerm(e.target.value)} className="p-2 border rounded">
        {terms.map(term => <option key={term} value={term}>{term}</option>)}
      </select>
      <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="p-2 border rounded">
        {classes.map(cls => <option key={cls} value={cls}>{cls}</option>)}
      </select>
    </div>
  );
}
