import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Box, Button, Heading, HStack, Image, Menu, MenuButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Spacer, Text, useColorMode, VStack } from "@chakra-ui/react"
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
  <Box>
  <VStack sx={{"position": "fixed", "width": "100%", "top": "0px", "zIndex": "5"}}>
  <HStack>
  <Image src={`favicon.ico`}/>
  <Heading>
  {`Eche que paso!`}
</Heading>
</HStack>
  <Spacer/>
  <Menu>
  <MenuButton>
  {`Menu`}
</MenuButton>
</Menu>
  <Heading>
  {`The number is ${ecuacion.resultado}`}
</Heading>
  <Button onClick={(_e) => addEvents([Event("ecuacion.suma", {})], (_e))}>
  {`Update`}
</Button>
  <Spacer/>
</VStack>
</Box>
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
