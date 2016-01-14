import React, { Component, PropTypes} from 'react'
import addField from '../form_builder'

export default class RegisterForm extends Component {
    render() {
        let fields = []
        fields.push(addField('email', 'Email', this.props.formIssues))
        fields.push(addField('pw1', 'Password', this.props.formIssues, 'password'))
        fields.push(addField('pw2', 'Repeat', this.props.formIssues, 'password'))

        return (
                <div>
                <form onSubmit={e => this.submit(e)}>
                    {fields}
                    <input type='submit' text='Register' />
                </form>

                <a href="/login" onClick={e => this.switchToLogin(e)}>Already have an account?</a>
                </div>
        )
    }

    submit(e) {
        e.preventDefault()

        // Validate values
        let issues = this.validateForm()
        if(issues.length > 0) {
            this.props.onRegistrationInvalid(issues)
            return
        }

        this.props.onRegisterClick(email.value, pw1.value, name.value, company.value, industry.value)
    }

    switchToLogin(e) {
        e.preventDefault()
        this.props.onGotoLoginClick()
    }

    validateForm(e) {
        let issues = []
        if(!pw1.value || pw1.value.length < 8) {
            issues.push({
                id: pw1.id,
                desc: 'Password must be at least 8 characters long',
                val: this.refs.pw1.value
            })
        }
        if(pw1.value !== pw2.value) {
            issues.push({
                id: pw2.id,
                desc: 'Password do not match',
                val: this.refs.pw2.value
            })
        }

        if(!name.value) {
            issues.push({
                id: name.id,
                desc: 'Name must be supplied',
                val: this.refs.name.value
            })
        }
        return issues
    }
}

RegisterForm.propTypes = {
    formIssues: PropTypes.array.isRequired,

    onGotoLoginClick: PropTypes.func.isRequired,
    onRegisterClick: PropTypes.func.isRequired,
    onRegistrationInvalid: PropTypes.func.isRequired
}

