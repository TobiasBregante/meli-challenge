import Icon from "@/src/components/ui/icons"
import Text from "@/src/components/ui/texts"

const OptionGroup = ({ value, text, icon, isSelected, onClick }) => (
    <div onClick={() => onClick(value)} className={`d-flex flex-column rounded-16 p-3 pointer mx-2 bg-gray-${isSelected ? "500" : "100"} border ${isSelected ? "border-dark" : ""}`}>
        <Icon id={icon} className="fs-1 text-center" />
        <Text weight={600}>
            {text}
        </Text>
    </div>
)

export default OptionGroup