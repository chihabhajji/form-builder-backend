import {Component, FormType, PropertyType} from "./form.enum";

export const TEST_FORM_DATA = {
    _id: 'test',
    campaignName: 'Test campaign with all types of fields (the vision)',
    fields: [
        {
            name: 'email',
            label: 'Email',
            component: Component.text,
            type: FormType.EMAIL,
            placeholder: 'xxx@gmail.com',
        },
        {
            name: 'password',
            label: 'Password',
            component: Component.text,
            type: FormType.PASSWORD,
            placeholder: '********',
        },
        {
            name: 'confirmPassword',
            label: 'Confirm Password',
            component: Component.text,
            type: FormType.PASSWORD,
            placeholder: '********',
        },
        {
            name: 'newPassword',
            label: 'New Password',
            component: Component.text,
            type: FormType.PASSWORD,
            placeholder: '********',
        },
        {
            name: 'bio',
            label: 'Bio',
            component: Component.textarea,
            rows: 3,
        },
        {
            name: 'address',
            label: 'Address',
            component: Component.text,
            type: FormType.ADDRESS,
            placeholder: 'xxx city',
        },
        {
            name: 'gender',
            label: 'Gender',
            component: Component.radioGroup,
            options: [
                {
                    value: 'FEMALE',
                    label: 'Female',
                },
                {
                    value: 'MALE',
                    label: 'Male',
                },
                {
                    value: 'OTHER',
                    label: 'Other',
                },
            ],
        },
        {
            name: 'title',
            label: 'Title',
            component: Component.select,
            options: [
                {
                    value: 'Mr',
                    label: 'Mr',
                },
                {
                    value: 'Mrs',
                    label: 'Mrs',
                },
                {
                    value: 'Miss',
                    label: 'Miss',
                },
                {
                    value: 'Dr',
                    label: 'Dr',
                },
            ],
        },
        {
            name: 'mood',
            label: 'Mood',
            component: Component.select,
            options: [
                {
                    value: 'GREATE',
                    label: '😀',
                },
                {
                    value: 'UPSET',
                    label: '😥',
                },
                {
                    value: 'ANGRY',
                    label: '😡',
                },
                {
                    value: 'INLOVE',
                    label: '🥰',
                },
                {
                    value: 'SCARED',
                    label: '😱',
                },
                {
                    value: 'COLD',
                    label: '🥶',
                },
                {
                    value: 'SICK',
                    label: '🤢',
                },
            ],
            multiple: true,
        },
    ],
    properties: {
        email: {
            type: PropertyType.STRING,
            format: 'email',
            minLength: 1,
            errorMessage: {
                required: 'Email is required',
                minLength: 'Email is required',
                format: 'Email is invalid',
            },
        },
        password: {
            type: PropertyType.STRING,
            minLength: 1,
            errorMessage: {
                required: 'Password is required',
                minLength: 'Password is required',
            },
        },
        confirmPassword: {
            type: PropertyType.STRING,
            minLength: 1,
            const: {$data: '1/password'},
            errorMessage: {
                required: 'Confirm password is required',
                minLength: 'Confirm password is required',
                const: 'Confirm password must match current password',
            },
        },
        newPassword: {
            type: PropertyType.STRING,
            minLength: 1,
            not: {const: {$data: '1/password'}},
            errorMessage: {
                required: 'New password is required',
                minLength: 'New password is required',
                not: 'New password must differ from current password',
            },
        },
        isDeveloper: {
            type: PropertyType.BOOLEAN,
            const: true,
            errorMessage: {
                type: 'Is developer is required',
                required: 'Is developer is required',
                const: 'Is developer is required',
            },
        },
        bio: {
            type: PropertyType.STRING,
            minLength: 1,
            maxLength: 20,
            errorMessage: {
                required: 'Bio is required',
                minLength: 'Bio is required',
                maxLength: 'Bio must be no longer than 20 characters',
            },
        },
        gender: {
            type: PropertyType.STRING,
            enum: ['FEMALE', 'MALE'],
            errorMessage: {
                required: 'Gender is required',
                enum: 'Gender must be equal to one of Female, Male',
            },
        },
        title: {
            type: PropertyType.STRING,
            minLength: 1,
            errorMessage: {
                required: 'Title is required',
                minLength: 'Title is required',
            },
        },
        fullName: {
            type: PropertyType.STRING,
            minLength: 1,
            errorMessage: {
                required: 'Full Name is required',
                minLength: 'Full Name is required',
            },
        },
        dob: {
            type: PropertyType.STRING,
            minLength: 1,
            minDate: new Date('2024-07-16').toISOString(),
            maxDate: new Date('2024-07-20').toISOString(),
            errorMessage: {
                required: 'Date of birth is required',
                minLength: 'Date of birth is required',
                minDate: 'Dob is no sooner than 2024-07-16',
                maxDate: 'Dob is no later than 2024-07-20',
            },
        },
        weight: {
            type: PropertyType.NUMBER,
            minimum: 1, // 63 kg
            errorMessage: {
                type: 'Weight is required',
                required: 'Weight is required',
                minimum: 'Weight is required',
            },
        },
        height: {
            type: PropertyType.NUMBER,
            minimum: 1,
            maximum: 250, // 172 cm
            errorMessage: {
                type: 'Height is required',
                required: 'Height is required',
                minimum: 'Height is required',
                maximum: 'Height is too height',
            },
        },
        mood: {
            type: PropertyType.ARRAY,
            minItems: 1,
            errorMessage: {
                required: 'Mood is required',
                minItems: 'Mood is required',
            },
        },
    },
    required: [
        'email',
        'password',
        'confirmPassword',
        'newPassword',
        'isDeveloper',
        'gender',
        'title',
        'bio',
        'fullName',
        'dob',
        'weight',
        'height',
        'mood',
    ],
};