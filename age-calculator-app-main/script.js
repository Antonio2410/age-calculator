document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.querySelector(".calculate-button");
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");

    calculateButton.addEventListener("click", function (event) {
        event.preventDefault();

        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);

        if (!day && !month && !year) {
            clearError();
        } else {
            const isValidDate = validateDate(day, month, year);

            if (!isValidDate) {
                showError("Must be a valid date", yearInput);
            } else {
                clearError();

                const ageResult = calculateAge(day, month, year);

                document.querySelector(".result-label.purple.years").textContent = ageResult.years;
                document.querySelector(".result-label.purple.months").textContent = ageResult.months;
                document.querySelector(".result-label.purple.days").textContent = ageResult.days;
            }
        }
    });

    dayInput.addEventListener("input", function () {
        clearError(dayInput);
        validateInput(dayInput);
    });

    monthInput.addEventListener("input", function () {
        clearError(monthInput);
        validateInput(monthInput);
    });

    yearInput.addEventListener("input", function () {
        clearError(yearInput);
        validateInput(yearInput);
    });

    function validateInput(inputField) {
        const inputValue = inputField.value.trim();
        const isValidInput = /^[0-9]*$/.test(inputValue) && inputValue >= 0 && inputValue <= (inputField.id === "day" ? 31 : (inputField.id === "month" ? 12 : new Date().getFullYear()));

        if (!isValidInput) {
            showError("Must be a valid date", inputField);
        } else {
            clearError(inputField);
        }
    }

    function showError(errorMessage, inputField) {
        clearError(inputField);

        const errorContainer = document.createElement("div");
        errorContainer.textContent = errorMessage;
        errorContainer.style.color = "red";
        errorContainer.className = "error-message";
        errorContainer.style.fontSize = "10px";
        errorContainer.style.marginTop = "4px";

        inputField.parentElement.appendChild(errorContainer);
    }

    function clearError(inputField) {
        if (inputField) {
            const existingErrorContainer = inputField.parentElement.querySelector(".error-message");
            if (existingErrorContainer) {
                inputField.parentElement.removeChild(existingErrorContainer);
            }
        } else {
            document.querySelectorAll(".error-message").forEach(function (errorContainer) {
                errorContainer.parentElement.removeChild(errorContainer);
            });
        }
    }

    function validateDate(day, month, year) {
        return /^[1-9]$|^[1-2]\d$|^3[0-1]$/.test(day) && /^[1-9]$|^1[0-2]$/.test(month) && /^[1-9]\d*$/.test(year);
    }

    function calculateAge(day, month, year) {
        const currentDate = new Date();
        const birthDate = new Date(year, month - 1, day);

        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();
        let days = currentDate.getDate() - birthDate.getDate();

        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months = 12 + months;
        }

        if (days < 0) {
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
            days = lastMonth.getDate() + days;
            months--;
        }

        return {
            years: years,
            months: months,
            days: days
        };
    }
});
