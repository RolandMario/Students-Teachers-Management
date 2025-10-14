export const student = {
  name: 'Jane Doe',
  studentId: 'STU-001',
  class: 'Grade 10',
  term: 'first_term',
  photo: 'https://via.placeholder.com/150',
  assessments: [
    { subject: 'Math', type: 'first_test', score: 40, maxScore: 50, term: 'first_term' },
    { subject: 'Math', type: 'second_test', score: 45, maxScore: 50, term: 'first_term' },
    { subject: 'Math', type: 'exam', score: 85, maxScore: 100, term: 'first_term' },
    { subject: 'English', type: 'first_test', score: 42, maxScore: 50, term: 'first_term' },
    { subject: 'English', type: 'exam', score: 78, maxScore: 100, term: 'first_term' },
  ],
  attendance: [
    { date: '2025-10-01', session: 'morning', status: 'present' },
    { date: '2025-10-01', session: 'afternoon', status: 'excused' },
    { date: '2025-10-02', session: 'morning', status: 'absent' },
    { date: '2025-10-02', session: 'afternoon', status: 'present' },
  ]
};
