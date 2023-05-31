import {maxLengthCreator, required} from "../../../utilities/validators/Validators"
import {createField, GetStringKeys, Input, Textarea} from "../../Common/FormsControls/FormsControls"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import React from "react"

const maxLength30 = maxLengthCreator(30)

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddNewPostFormValuesTypeKeys>(
                    [required], 'Enter new post text', 'newPostText', Input)}
                <Field validate={[required, maxLength30]}
                       component={Textarea}
                       name='newPostText'
                       placeholder='Enter new text'/>
            </div>
            <div>
                <button>Add post</button>
            </div>

        </form>
    )
}

export default reduxForm<AddPostFormValuesType, PropsType>({form: 'myPostForm'})(AddNewPostForm)

type AddNewPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>
export type AddPostFormValuesType = {
    newPostText: string
}
type PropsType = {

}
