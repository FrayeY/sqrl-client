import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    FormControl,
    FormLabel,
    Select,
    Stack,
    Switch,
    UseDisclosureProps,
} from "@chakra-ui/react"
import React, { useRef } from "react"
import { usePreferences } from "../PreferencesContext"

const PreferencesDrawer = (props: {
    disclosure: UseDisclosureProps
    drawerprops: any
}) => {
    const { isOpen, onOpen, onClose } = props.disclosure
    const firstField = useRef() as React.MutableRefObject<HTMLInputElement>

    const {
        state: {
            scale,
            start,
            end,
            showTimeInMeeting,
            showCourseSuffix,
            palette,
            highlightConflicts,
        },
        dispatch,
    } = usePreferences()

    return (
        <Drawer {...props.drawerprops} size="md">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Preferences</DrawerHeader>

                <DrawerBody>
                    <Stack spacing="24px">
                        {/* <Box>
                            <FormLabel htmlFor="username">Name</FormLabel>
                            <Input
                                ref={firstField}
                                id="username"
                                placeholder="Please enter user name"
                            />
                        </Box> */}
                        <Box>
                            <FormControl
                                display="flex"
                                alignItems="center"
                                mt={3}
                            >
                                <FormLabel htmlFor="show-times" mb="0">
                                    Show meeting times within timetable?
                                </FormLabel>
                                <Switch
                                    size="lg"
                                    id="show-times"
                                    isChecked={showTimeInMeeting}
                                    onChange={(e) => {
                                        const payload = e.target.checked

                                        dispatch({
                                            type: "SET_SHOW_TIME_IN_MEETING",
                                            payload,
                                        })
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl display="flex" alignItems="center">
                                <FormLabel htmlFor="show-suffix" mb="0">
                                    Show course suffix? (Y1, H1, H5, etc.)
                                </FormLabel>
                                <Switch
                                    size="lg"
                                    id="show-suffix"
                                    isChecked={showCourseSuffix}
                                    onChange={(e) => {
                                        const payload = e.target.checked

                                        dispatch({
                                            type: "SET_SHOW_COURSE_SUFFIX",
                                            payload,
                                        })
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl display="flex" alignItems="center">
                                <FormLabel htmlFor="highlight-conflicts" mb="0">
                                    Highlight conflicts?
                                </FormLabel>
                                <Switch
                                    size="lg"
                                    id="highlight-conflicts"
                                    isChecked={highlightConflicts}
                                    onChange={(e) => {
                                        const payload = e.target.checked

                                        dispatch({
                                            type: "SET_HIGHLIGHT_CONFLICTS",
                                            payload,
                                        })
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box>
                            <FormLabel htmlFor="scale">Scale</FormLabel>
                            <Select
                                id="scale"
                                value={scale}
                                onChange={(e) => {
                                    const payload = e.target.value as any

                                    dispatch({
                                        type: "SET_SCALE",
                                        payload,
                                    })
                                }}
                            >
                                <option value="compact">Compact</option>
                                <option value="normal">Normal</option>
                                <option value="tall">Tall</option>
                            </Select>
                        </Box>

                        <Box>
                            <FormLabel htmlFor="palette">Palette</FormLabel>
                            <Select
                                id="palette"
                                value={palette}
                                onChange={(e) => {
                                    const payload = e.target.value as any

                                    dispatch({
                                        type: "SET_PALETTE",
                                        payload,
                                    })
                                }}
                            >
                                <option value="default">Default</option>
                                <option value="monochrome">Monochrome</option>
                                {/* <option value="accessible">
                                    High contrast
                                </option> */}
                            </Select>
                        </Box>

                        <Flex>
                            <Box mr={3}>
                                <FormLabel htmlFor="start">
                                    Start time
                                </FormLabel>
                                <Select
                                    id="start"
                                    value={start}
                                    onChange={(e) => {
                                        const payload = e.target.value as any

                                        dispatch({
                                            type: "SET_START",
                                            payload,
                                        })
                                    }}
                                >
                                    {[...Array(15)].map((_, i) => (
                                        <option value={8 + i}>
                                            {8 + i}:00
                                        </option>
                                    ))}
                                </Select>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="end">End time</FormLabel>
                                <Select
                                    id="end"
                                    value={end}
                                    onChange={(e) => {
                                        const payload = e.target.value as any

                                        dispatch({
                                            type: "SET_END",
                                            payload,
                                        })
                                    }}
                                >
                                    {[...Array(22 - start)].map((_, i) => (
                                        <option
                                            value={parseInt(start + "") + 1 + i}
                                        >
                                            {parseInt(start + "") + 1 + i}:00
                                        </option>
                                    ))}
                                </Select>
                            </Box>
                        </Flex>
                    </Stack>
                </DrawerBody>

                <DrawerFooter borderTopWidth="1px">
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    {/* <Button colorScheme="blue">Submit</Button> */}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default PreferencesDrawer
