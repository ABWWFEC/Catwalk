import React from 'react';

const NavBar = ({ viewMode, setViewMode }) => {

  const handleChange = () => {
    setViewMode(!viewMode);
    toggleBodyClasses(viewMode);
  }

  const toggleBodyClasses = isDarkMode => {
    if (isDarkMode) {
      const test = document.querySelectorAll('*');
      test.forEach(el => {
        el.classList.add('bg-dark', 'text-light', 'border-light')

      });
      // document.body.classList.add('bg-dark', 'text-light');
      // document.body.classList.remove('bg-light', 'text-dark');
    } else {
      const test = document.querySelectorAll('*');
      test.forEach(el => {
      el.classList.remove('bg-dark', 'text-light', 'border-light')
      });
      // document.body.classList.add('bg-light', 'text-dark');
      // document.body.classList.remove('bg-dark', 'text-light');
    }
  }

  return (
    <div className="form-check form-switch">
      <input onChange={ handleChange }
        className="form-check-input"
        type="checkbox"
        id="flexSwitchCheckDefault"
      />
      { viewMode
       ?
        <label
          className="form-check-label"
          htmlfor="flexSwitchCheckDefault">Light Mode
        </label>
       :
        <label
          className="form-check-label"
          htmlfor="flexSwitchCheckDefault">Dark Mode
        </label>
       }
    </div>
  )
}

export default NavBar;