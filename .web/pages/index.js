import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Box, Center, Container, Divider, Flex, Image, Link, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useColorMode } from "@chakra-ui/react"
import NextLink from "next/link"
import NextHead from "next/head"



export default function Component() {
  const ecuacion = useContext(StateContext)
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
  const focusRef = useRef();
  
  // Main event loop.
  const [addEvents, connectError] = useContext(EventLoopContext)

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => addEvents(initialEvents.map((e) => ({...e})))
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])


  return (
    <Fragment>
  <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {`http://localhost:8000`}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  <Container sx={{"margin": 0, "padding": 0, "maxWidth": "100%"}}>
  <Flex sx={{"justifyContent": "space-between", "width": "100%", "padding": "1rem", "backgroundColor": "rgb(0,0,0)", "color": "rgb(255,255,255)"}}>
  <Box sx={{"display": "grid"}}>
  <Link as={NextLink} href={`/`} sx={{"justifyContent": "space-between", "display": "flex", "alignItems": "center"}}>
  <Image src={`/favicon.ico`} sx={{"width": "15px"}}/>
  <Text>
  {`Eche Que Paso!`}
</Text>
</Link>
</Box>
  <Center>
  <Menu>
  <MenuButton>
  {`MENU`}
</MenuButton>
  <MenuList sx={{"color": "rgb(0,0,0)"}}>
  <MenuItem>
  <Link as={NextLink} href={`/`}>
  {`Home`}
</Link>
</MenuItem>
  <MenuItem>
  <Link as={NextLink} href={`/about`}>
  {`About`}
</Link>
</MenuItem>
  <MenuItem>
  <Link as={NextLink} href={`/contact`}>
  {`Posts`}
</Link>
</MenuItem>
</MenuList>
</Menu>
</Center>
</Flex>
  <Divider/>
</Container>
  <NextHead>
  <title>
  {`My Beautiful App`}
</title>
  <meta content={`A beautiful app built with Reflex`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
