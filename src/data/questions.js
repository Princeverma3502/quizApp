// Demo questions to make the app usable out-of-the-box.
// These can be edited via the UI and are persisted to localStorage when added.
const questions = [
	{
		id: 1,
		text: 'Which language runs in the browser?',
		choices: ['Java', 'C', 'Python', 'JavaScript'],
		correctIndex: 3
	},
	{
		id: 2,
		text: 'What does CSS stand for?',
		choices: ['Central Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style System'],
		correctIndex: 1
	},
	{
		id: 3,
		text: 'Which company developed React?',
		choices: ['Google', 'Facebook', 'Microsoft', 'Amazon'],
		correctIndex: 1
	},
	{
		id: 4,
		text: 'What is the command to create a new React app with Vite?',
		choices: ['npx create-react-app', 'npm init vite@latest', 'yarn create react-app', 'npm create vite-app'],
		correctIndex: 1
	},
	{
		id: 5,
		text: 'Which HTML element is used for the largest heading?',
		choices: ['<heading>', '<h6>', '<h1>', '<head>'],
		correctIndex: 2
	}
]

export default questions
