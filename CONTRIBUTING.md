# Contributing to Modern Weather Dashboard

First off, thank you for considering contributing to Modern Weather Dashboard! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- **Be Respectful**: Treat everyone with respect and kindness
- **Be Collaborative**: Work together and help each other
- **Be Patient**: Not everyone has the same level of experience
- **Be Constructive**: Provide helpful feedback and suggestions

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear Title**: Describe the issue concisely
- **Steps to Reproduce**: Detailed steps to reproduce the bug
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Screenshots**: If applicable
- **Environment**: Browser, OS, Python version
- **Console Logs**: Any error messages

**Bug Report Template:**
```markdown
**Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen.

**Actual Behavior**
What actually happens.

**Environment**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 120]
- Python: [e.g., 3.9.0]

**Screenshots/Logs**
Add any relevant screenshots or error logs.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear Title**: Concise feature description
- **Detailed Description**: Explain the feature and its benefits
- **Use Cases**: Real-world scenarios where this would be useful
- **Mockups**: Visual designs if applicable
- **Implementation Ideas**: Technical approach (optional)

**Feature Request Template:**
```markdown
**Feature Description**
Clear description of the feature.

**Problem it Solves**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other approaches you've thought about.

**Additional Context**
Mockups, examples, or relevant info.
```

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
6. **Push to your fork**
7. **Open a Pull Request**

## 💻 Development Setup

### Prerequisites
- Python 3.7+
- Git
- Modern web browser
- Code editor (VS Code recommended)

### Setup Steps

1. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/modern-weather.git
   cd modern-weather
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up API key**
   ```bash
   # Create .env file
   echo "OPENWEATHER_API_KEY=your_key_here" > .env
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Access at** `http://localhost:5000`

### Development Workflow

1. **Create a branch** for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** and test locally

3. **Commit regularly** with clear messages
   ```bash
   git add .
   git commit -m "Add: feature description"
   ```

4. **Keep your fork updated**
   ```bash
   git fetch upstream
   git merge upstream/main
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🔄 Pull Request Process

1. **Update Documentation**: Update README if needed
2. **Test Thoroughly**: Ensure all features work
3. **Follow Style Guide**: Match existing code style
4. **Describe Changes**: Clear PR description
5. **Link Issues**: Reference related issues
6. **Request Review**: Tag maintainers
7. **Address Feedback**: Respond to review comments

### PR Title Format
```
[Type] Brief description

Types:
- Fix: Bug fix
- Add: New feature
- Update: Improvement to existing feature
- Refactor: Code restructuring
- Docs: Documentation changes
- Style: CSS/UI changes
- Test: Test additions/fixes
```

### PR Description Template
```markdown
## Description
Brief description of changes.

## Related Issue
Fixes #123

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on mobile
- [ ] All features working

## Screenshots
Add screenshots if UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
```

## 🎨 Style Guidelines

### Python Code Style

Follow **PEP 8** guidelines:

```python
# Good
def fetch_weather(city_name, api_key):
    """Fetch weather data for a given city.
    
    Args:
        city_name (str): Name of the city
        api_key (str): OpenWeatherMap API key
    
    Returns:
        dict: Weather data
    """
    url = f"https://api.openweathermap.org/data/2.5/weather"
    params = {"q": city_name, "appid": api_key}
    response = requests.get(url, params=params)
    return response.json()

# Bad
def fetchWeather(cityName,apiKey):
    url="https://api.openweathermap.org/data/2.5/weather"
    r=requests.get(url,params={"q":cityName,"appid":apiKey})
    return r.json()
```

**Key Points:**
- Use snake_case for functions and variables
- Add docstrings to functions
- Maximum line length: 88 characters
- Use meaningful variable names
- Add type hints when possible

### JavaScript Code Style

```javascript
// Good
function updateWeather(cityName) {
  const weatherData = fetchWeatherData(cityName);
  
  if (!weatherData) {
    console.error('No weather data found');
    return;
  }
  
  renderWeatherCard(weatherData);
}

// Bad
function updateweather(c){
  var w=fetchWeatherData(c)
  if(!w)return
  renderWeatherCard(w)
}
```

**Key Points:**
- Use camelCase for functions and variables
- Use const/let instead of var
- Add comments for complex logic
- Use semicolons consistently
- Use template literals for strings

### CSS Code Style

```css
/* Good */
.weather-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--glass-bg);
  border-radius: var(--glass-radius);
  padding: 20px;
  transition: transform 0.3s ease;
}

.weather-card:hover {
  transform: translateY(-4px);
}

/* Bad */
.weather-card{display:flex;background:#fff;padding:20px}
.weather-card:hover{transform:translateY(-4px)}
```

**Key Points:**
- Use kebab-case for class names
- One property per line
- Use CSS variables for theming
- Group related properties
- Add comments for complex styles

## 📝 Commit Messages

Follow the **Conventional Commits** specification:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: CSS/formatting changes
- **refactor**: Code restructuring
- **test**: Test additions
- **chore**: Maintenance tasks

### Examples

```bash
# Good commits
feat(weather): add 7-day forecast view
fix(map): resolve marker positioning issue
docs(readme): update installation instructions
style(dashboard): improve glassmorphism effects

# Bad commits
update code
fixed bug
changes
test
```

### Detailed Commit
```
feat(theme): add dark mode support

- Implemented dark theme CSS variables
- Added theme toggle button
- Persisted theme choice in localStorage
- Updated all components for theme compatibility

Closes #42
```

## 🧪 Testing Guidelines

### Before Submitting PR

- [ ] **Functionality**: All features work as expected
- [ ] **Cross-browser**: Test on Chrome, Firefox, Safari
- [ ] **Responsive**: Test on mobile and tablet
- [ ] **Console**: No JavaScript errors
- [ ] **API**: Test with valid and invalid inputs
- [ ] **Theme**: Test light, dark, and auto modes
- [ ] **Performance**: No significant slowdowns

### Manual Testing Checklist

1. **Search Functionality**
   - Valid city search
   - Invalid city handling
   - Empty input handling

2. **Forecast Views**
   - 24H view loads correctly
   - 3D view displays properly
   - 7D view shows all days

3. **Personalization**
   - Theme switching works
   - Units conversion accurate
   - Favorites save/load
   - Geolocation functional

4. **Responsive Design**
   - Mobile layout correct
   - Tablet layout correct
   - Desktop layout correct

## 🏆 Recognition

Contributors will be recognized in the README.md file and in release notes.

## 📧 Questions?

Feel free to open an issue with the `question` label or contact the maintainers directly.

## 🙏 Thank You!

Your contributions help make this project better for everyone. We appreciate your time and effort!

---

**Happy Coding! 🚀**
