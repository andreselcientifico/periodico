import reflex as rx


def navbar():
    return rx.flex(
        rx.box(
            rx.link(
                rx.image(src='/favicon.ico', width = '15px'),
                rx.text('Eche Que Paso!'),
                href='/',
                justify_content = 'space-between',
                display = 'flex',
                align_items = 'center',
            ),
            display = 'grid',
        ),
        rx.center(
            rx.menu(
                rx.menu_button('MENU'),
                rx.menu_list(
                    rx.menu_item(
                        rx.link('Home',href='/')
                    ),
                    rx.menu_item(
                        rx.link('About',href='/about')
                    ),
                    rx.menu_item(
                        rx.link('Posts',href='/contact',)
                    ),
                    color = 'rgb(0,0,0)',
                )
            )
        ),
        justify_content = 'space-between',
        width = '100%',
        padding = '1rem',
        background_color = 'rgb(0,0,0)',
        color = 'rgb(255,255,255)',
    )
    