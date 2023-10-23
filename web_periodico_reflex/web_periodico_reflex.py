"""Welcome to Reflex! This file outlines the steps to create a basic app."""
from rxconfig import config
import random

import reflex as rx

docs_url = "https://reflex.dev/docs/getting-started/introduction"
filename = f"{config.app_name}/{config.app_name}.py"


class ecuacion(rx.State):
    resultado: int
    def suma(self):
        number1: int = random.randint(0, 100)
        number2: int = random.randint(0, 100)
        self.resultado = number1 + number2

@rx.page(
    title='My Beautiful App',
    description='A beautiful app built with Reflex',
    image='favicon.ico',
)
def navbar():
    return rx.box(
        rx.vstack(
            rx.hstack(
                rx.image(src="favicon.ico"),
                rx.heading("Eche que paso!"),
            ),
            rx.spacer(),
            rx.menu(
                rx.menu_button("Menu"),
            ),
            rx.heading(
                f"The number is {ecuacion.resultado}"
            ),
            rx.button("Update", on_click=ecuacion.suma),
            rx.spacer(),
            position="fixed",
            width="100%",
            top="0px",
            z_index="5",
            )
        )


# Add state and page to the app.
app = rx.App()
app.compile()
