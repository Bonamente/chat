export default {
  translation: {
    nav: {
      logo_text: 'Hexlet Chat',
      logout_button: 'Выйти',
    },
    logInForm: {
      title: 'Войти',
      login_button: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      no_account: 'Нет аккаунта?',
      link: 'Регистрация',
    },
    signUpForm: {
      title: 'Регистрация',
      signup_button: 'Зарегистрироваться',
      username: 'Имя пользователя',
      password: 'Пароль',
      password_confirmation: 'Подтвердите пароль',
    },
    messageForm: {
      placeholder: 'Введите сообщение...',
      new_message: 'Новое сообщение',
      send_button: 'Отправить',
    },
    channels: {
      title: 'Каналы',
      actions: 'Управление каналом',
      dropdown: {
        remove: 'Удалить',
        rename: 'Переименовать',
      },
    },
    messages: {
      message_one: '{{count}} сообщение',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',
    },
    modal: {
      add: {
        title: 'Добавить канал',
        name: 'Имя канала',
        cancel_button: 'Отменить',
        submit_button: 'Отправить',
      },
      rename: {
        title: 'Переименовать канал',
        name: 'Имя канала',
        cancel_button: 'Отменить',
        submit_button: 'Отправить',
      },
      remove: {
        title: 'Удалить канал',
        lead: 'Уверены?',
        cancel_button: 'Отменить',
        submit_button: 'Удалить',
      },
    },
    notFound: {
      title: 'Страница не найдена',
      lead: 'Но вы можете перейти',
      link: 'на главную страницу',
    },
    errors: {
      login: {
        invalid_credentials: 'Неверные имя пользователя или пароль',
      },
      signup: {
        required: 'Обязательное поле',
        username_length: 'От 3 до 20 символов',
        username_not_unique: 'Такой пользователь уже существует',
        password_min_length: 'Не менее 6 символов',
        passwords_not_equal: 'Пароли должны совпадать',
      },
      modal: {
        required: 'Обязательное поле',
        length: 'От 3 до 20 символов',
        unique: 'Должно быть уникальным',
      },
    },
    toasts: {
      add_channel: 'Канал создан',
      rename_channel: 'Канал переименован',
      remove_channel: 'Канал удалён',
      net_error: 'Ошибка соединения',
    },
  },
};
