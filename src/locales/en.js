export default {
  translation: {
    nav: {
      logo_text: 'Hexlet Chat',
      logout_button: 'Log out',
    },
    logInForm: {
      title: 'Log In',
      login_button: 'Log in',
      username: 'Your nickname',
      password: 'Password',
      no_account: 'Don\'t have an account?',
      link: 'Sign up',
    },
    signUpForm: {
      title: 'Sign Up',
      signup_button: 'Sign up',
      username: 'Username',
      password: 'Password',
      password_confirmation: 'Confirm password',
    },
    messageForm: {
      placeholder: 'Enter your message...',
      new_message: 'New message',
      send_button: 'Send',
    },
    channels: {
      title: 'Channels',
      actions: 'Channel actions',
      dropdown: {
        remove: 'Delete',
        rename: 'Rename',
      },
    },
    messages: {
      message_one: '{{count}} message',
      message_other: '{{count}} messages',
    },
    modal: {
      add: {
        title: 'Add a channel',
        name: 'Channel name',
        cancel_button: 'Cancel',
        submit_button: 'Add',
      },
      rename: {
        title: 'Rename the channel',
        name: 'Channel name',
        cancel_button: 'Cancel',
        submit_button: 'Rename',
      },
      remove: {
        title: 'Delete the channel',
        lead: 'Are you sure?',
        cancel_button: 'Cancel',
        submit_button: 'Delete',
      },
    },
    notFound: {
      title: 'Page not found',
      lead: 'But you can go',
      link: 'to the home page',
    },
    errors: {
      login: {
        invalid_credentials: 'Invalid user name or password',
      },
      signup: {
        required: 'Required field',
        username_length: '3 to 20 characters',
        username_not_unique: 'A user with this name already exists',
        password_min_length: 'At least 6 characters',
        passwords_not_equal: 'Passwords must match',
      },
      modal: {
        required: 'Required field',
        length: '3 to 20 characters',
        unique: 'Must be unique',
      },
    },
    toasts: {
      add_channel: 'Channel has been created',
      rename_channel: 'Channel has been renamed',
      remove_channel: 'Channel has been deleted',
      net_error: 'Connection error',
    },
  },
};
