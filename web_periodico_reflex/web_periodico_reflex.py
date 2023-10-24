"""Welcome to Reflex! This file outlines the steps to create a basic app."""
from rxconfig import config
import random

import reflex as rx

from web_periodico_reflex.components.navbar import navbar

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
def index() -> rx.component:
    return rx.container(
        navbar(),
        rx.divider(),
        margin = 0,
        padding = 0,
        max_width = '100%',
    )

@rx.page()
def about() -> rx.component:
    return rx.container(
        navbar(),
        rx.divider(),
        margin = 0,
        padding = 0,
        max_width = '100%',
    )
    

# Add state and page to the app.
app = rx.App()
app.compile()
