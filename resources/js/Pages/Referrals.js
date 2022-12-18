import React from 'react';
import Authenticated from '@/Layouts/Authenticated';

import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, useForm } from '@inertiajs/inertia-react';

import Select from 'react-select/creatable'

export default function Referrals(props) {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        const id = e.target.elements.email.value;

        post(route('referrals'));
    };

    const alertStyle = {
        padding: '5px',
        color: '#fff',
        background: '#a4a4e5',
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Referrals</h2>}
        >
            <Head title="Referrals" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            {props.alert && (<div style={alertStyle} dangerouslySetInnerHTML={{ __html: props.alert }}/>)}

                            You have {props.referrals}/{props.max_invites} referrals.
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <ValidationErrors errors={errors} />

                            <form onSubmit={submit}>

                                <div className="mt-4">
                                    <Label forInput="email" value="Email" />

                                    <Input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        handleChange={onHandleChange}
                                        required
                                    />
                                    
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Button className="ml-4" processing={processing}>
                                        Send Invitation
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Authenticated>
    );
}
