import { Flex, Link } from "@chakra-ui/react";

const FeedbackLink = ({ siteId }) => {
    return (
        <Flex justifyContent="space-between" mb={8} width="full" mt={1}>
            <Link fontWeight="bold" fontSize="sm" href={'/p/${siteId}'}>
                Leave Comment
            </Link>
            <Link fontWeight="xs" color="blackAlpha.500" href={'/'}>
                Powered by FF Your mum
            </Link>
        </Flex>
    )
}

export default FeedbackLink